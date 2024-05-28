import { Curve, Vector3 } from 'three';

// Author: ryuVitoshi (https://github.com/ryuVitoshi/RoundedCurve)

function adjustPoint( p0, p1, p2, p3, r, w ) {

    if ( r <= 0 ) return p0;

    const dir1 = p1.clone().sub( p2 );
    const dir3 = p3.clone().sub( p2 );

    const len1 = dir1.length();
    const len3 = dir3.length();

    if ( len1 === 0 || len3 === 0 ) return p0;
    
    const dir1n = dir1.clone().normalize();
    const dir3n = dir3.clone().normalize();

    const tanOver2 = dir1n.clone().sub( dir3n ).length() / dir1n.clone().add( dir3n ).length();

    if ( tanOver2 >= 1000 || tanOver2 === 0 ) return p0;

    const distToTangent = Math.min( r / tanOver2, len1 * 0.5, len3 * 0.5 );
    r = tanOver2 * distToTangent;

    const len0 = p0.clone().sub( p2 ).length();

    if ( len0 > distToTangent ) return p0;

    const angleOver2 = Math.atan( tanOver2 );

    const fullAngle = Math.PI - angleOver2 * 2;
    const rotAngle = fullAngle * 0.5 * ( 1 + Math.sign( w ) * len0 / distToTangent );

    const n = dir3.clone().cross( dir1.clone() ).normalize();

    const distToCenter = r / Math.sin( angleOver2 );

    const pointCenter = dir1n.clone().add( dir3n ).normalize().multiplyScalar( distToCenter ).add( p2 );

    const dirStart = dir1n.clone().multiplyScalar( distToTangent ).add( p2 ).sub( pointCenter );

    return dirStart.clone().applyAxisAngle( n, rotAngle ).add( pointCenter );

}

class RoundedCurve extends Curve {

	constructor ( points = [], closed = false, radius = 1 ) {

		super();

        this.type = 'RoundedCurve';

		this.points = points;
		this.closed = closed;
        this.radius = radius;

	}

    getPoint( t, optionalTarget = new Vector3() ) {

		const point = optionalTarget;

		const points = this.points;
		const l = points.length;

		const p = ( l - ( this.closed ? 0 : 1 ) ) * t;
		let intPoint = Math.round( p );
		let weight = p - intPoint;

		if ( this.closed ) {

			intPoint += intPoint > 0 ? 0 : ( Math.floor( Math.abs( intPoint ) / l ) + 1 ) * l;

		} else if ( intPoint === l - 1 ) {

			intPoint = l - 2;
			weight += 1;

		} else if ( intPoint === 0 ) {

            intPoint = 1;
			weight -= 1;

        }

		const p1 = points[ ( intPoint - 1 ) % l ];
		const p2 = points[ ( intPoint + 0 ) % l ];
        const p3 = points[ ( intPoint + 1 ) % l ];

		let p0;

        if (weight < 0)
            p0 = p2.clone().addScaledVector( p1.clone().sub( p2 ), -weight );
        else
            p0 = p2.clone().addScaledVector( p3.clone().sub( p2 ), weight );

		point.copy( adjustPoint( p0, p1, p2, p3, this.radius, weight ) );

		return point;

	}

    copy( source ) {

		super.copy( source );

		this.points = [];

		for ( let i = 0, l = source.points.length; i < l; i ++ ) {

			const point = source.points[ i ];

			this.points.push( point.clone() );

		}

		this.closed = source.closed;

		return this;

	}

	toJSON() {

		const data = super.toJSON();

		data.points = [];

		for ( let i = 0, l = this.points.length; i < l; i ++ ) {

			const point = this.points[ i ];
			data.points.push( point.toArray() );

		}

		data.closed = this.closed;

		return data;

	}

	fromJSON( json ) {

		super.fromJSON( json );

		this.points = [];

		for ( let i = 0, l = json.points.length; i < l; i ++ ) {

			const point = json.points[ i ];
			this.points.push( new Vector3().fromArray( point ) );

		}

		this.closed = json.closed;
		this.curveType = json.curveType;
		this.tension = json.tension;

		return this;

	}

}

export { RoundedCurve };
