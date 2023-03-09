type Result<T> =
  | {
      success: true;
      value: T;
    }
  | {
      success: false;
      error: unknown;
    };

export const makeSafe =
  <TArgs extends any[], TReturn>(func: (...args: TArgs) => TReturn) =>
  (...args: TArgs): Result<TReturn> => {
    try {
      return {
        value: func(...args),
        success: true,
      };
    } catch (e) {
      return {
        error: e,
        success: false,
      };
    }
  };
