import { TypeAnimation } from 'react-type-animation';

function TextType() {
  return (
    <>
      <TypeAnimation
        sequence={[1000, 'This insnt Game of Thrones, Morty!', 1000, '', 1000]}
        wrapper="span"
        repeat={Infinity}
      />
    </>
  );
}

export default TextType;
