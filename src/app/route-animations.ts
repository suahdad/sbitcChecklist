import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes
} from '@angular/animations'

export const slider = 
    trigger('routeAnimations' , [
        transition('* => isRight', slideTo('right') )
    ]);


function slideTo(direction) {
    const optional = {optional : true}
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top:0,
                [direction]: 0,
                width: '100%'
    
            })
        ], optional),
        query(':enter',[
            style({ [direction]: '-100%' })
        ]),
        group([        
            
            query(':leave',[
                animate('600ms', style({ [direction]: '100%'}))
            ], optional),
            query(':enter', [
                animate('600ms', style({ [direction]: '0%'}))
        ])
    ])
    ]
        
    

}