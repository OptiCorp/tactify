function Button({
  isDisabled,
  clearBoard,
  className,
}: {
  isDisabled: boolean;
  clearBoard: () => void;
  className: string;
}) {
  return (
    <button
      className={`absolute right-4 top-[10%]  rounded-sm border border-amber-500 bg-orange-300 bg-opacity-40 px-4 py-2 text-amber-500 hover:bg-opacity-20   ${
        isDisabled ? 'cursor-not-allowed opacity-50' : '' + className
      }`}
      disabled={isDisabled}
      onClick={() => clearBoard()}
    >
      clear board
    </button>
  );
}

export default Button;
