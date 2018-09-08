import { Subscription } from 'rxjs';

export function AutoUnsubscribe(subName: string = 'sub') {  // decorator factory allows passing names other than a default 'sub'
  return function(constructor) {  // constructor of the class being decorated
    const original = constructor.prototype.ngOnDestroy;  // save a reference to the original ngOnDestroy function

    /*
      Decorated class must implement OnDestroy for AOT to work
      Otherwise 'ng build --prod' will optimize away any calls to ngOnDestroy,
      even if the method is added by the @AutoUnsubscribe decorator.

      Well, maybe we could just calls this.sub.unsubscribe() there then.
      But will play with the decorator anyway just for funsies.
    */
    if (typeof original !== 'function') {
      console.warn(`${constructor.name} is using @AutoUnsubscribe but does not implement OnDestroy`);
    }

    constructor.prototype.ngOnDestroy = function() {
      const sub: Subscription = this[subName];

      if (sub) {
        sub.unsubscribe();
      }
      // console.log(`${constructor.name} AutoUnsubscribe decorator called`);

      if (original && (typeof original === 'function')) {
        original.apply(this, arguments);

        // console.log(`${constructor.name} original ngOnDestory called`, original);
      }
    };
  };
}

// https://netbasal.com/automagically-unsubscribe-in-angular-4487e9853a88
// https://github.com/NetanelBasal/ngx-auto-unsubscribe/blob/master/src/auto-unsubscribe.ts
// https://github.com/NetanelBasal/ngx-auto-unsubscribe/issues/7
