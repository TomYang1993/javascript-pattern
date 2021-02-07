
// outer catch will catch a re-thrown error
try {
    try {
      throw new Error('oops');
    } finally {
      console.log('finally');
    }
  } catch (ex) {
    console.error('outer', ex.message);
  }
  
  // Output:
  // "finally"
  // "outer" "oops"

  // inner catch already got the exception so no worries
  try {
    try {
      throw new Error('oops');
    } catch (ex) {
      console.error('inner', ex.message);
    } finally {
      console.log('finally');
    }
  } catch (ex) {
    console.error('outer', ex.message);
  }
  
  // Output:
  // "inner" "oops"
  // "finally"


  //common use case, rethrow an error/exception after handling a common exception
  try {
    try {
      throw new Error('oops');
    } catch (ex) {
      console.error('inner', ex.message);  // usually handling a common exception here
      throw ex;
    } finally {
      console.log('finally');
    }
  } catch (ex) {
    console.error('outer', ex.message);
  }
  
  // Output:
  // "inner" "oops"
  // "finally"
  // "outer" "oops"


  (function() {
    try {
      try {
        throw new Error('oops');
      } catch (ex) {
        console.error('inner', ex.message);
        throw ex;
      } finally {
        console.log('finally');
        return;
      }
    } catch (ex) {
      console.error('outer', ex.message);
    }
  })();
  
  // Output:
  // "inner" "oops"
  // "finally"