export function debounce (func, delay) {
   let timerId;

   return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timerId);
      timerId = setTimeout(() => {
         func.apply(context, args);
      }, delay);
   };
}