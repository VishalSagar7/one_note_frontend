export function phoneValidation(event){
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
      }
}