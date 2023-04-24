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
      className={`mt-2 hidden w-32 rounded-sm border border-amber-500 bg-orange-300 bg-opacity-40 px-4 py-2 text-amber-500 hover:bg-opacity-20 md:block   ${
        isDisabled ? 'ml-2 h-10 cursor-not-allowed opacity-50' : '' + className
      }`}
      disabled={isDisabled}
      onClick={() => clearBoard()}
    >
      Clear board
    </button>
  );
}

export default Button;
