import React, { useRef } from 'react';
import Picker from 'emoji-picker-react';
import './styles.css';

const EmojiPicker = ({ text, setText, user, type2 }) => {
  const [showPicker, setShowPicker] = React.useState(false);
  const [cursorPosition, setCursorPosition] = React.useState();
  const textRef = useRef(null);

  React.useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmojiClick = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const textWithEmoji = start + emoji + end;
    setText(textWithEmoji);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className={type2 ? 'imagesInput' : ''}>
      <div className={!type2 ? 'flexCenter' : ''}>
        <textarea
          ref={textRef}
          maxLength='100'
          value={text}
          placeholder={`What's on your mind, ${user?.first_name}?`}
          onChange={(e) => setText(e.target.value)}
          className={`postInput ${type2 ? 'input2' : ''}`}></textarea>
      </div>
      <div className={!type2 ? 'postEmojisContainer' : ''}>
        {showPicker && (
          <div
            className={`commentEmojiPicker ${
              type2 ? 'movePicker2' : 'rlMove'
            }`}>
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {!type2 && <img src='../../../icons/colorful.png' alt='' />}
        <i
          className={`emoji_icon_large ${type2 ? 'moveLeft' : ''}`}
          onClick={() => setShowPicker((prev) => !prev)}></i>
      </div>
    </div>
  );
};

export default EmojiPicker;
