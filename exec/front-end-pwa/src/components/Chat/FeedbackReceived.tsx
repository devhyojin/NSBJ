import { useState } from 'react';
import { useInterval } from 'react-use';
import styled from 'styled-components';

export default function FeedbackReceived(setIsReactionActive, reactionId): any {
  const emojiList = ['😇', '💗', '👩🏻‍🎓'];
  const [emojiRender, setEmojiRender] = useState([{ key: 0, emoji: '', offset: 0 }]);

  useInterval(() => {
    if (emojiRender.length > 20) {
      emojiRender.shift();
    }

    const offset = Math.floor(Math.random() * 1000);
    console.log('오프셋', offset);
    const key = offset + Math.random() * 1000000;
    let emoji = emojiList[0];
    if (reactionId > 0) {
      emoji = emojiList[reactionId - 1];
    }
    emojiRender.push({ key, emoji, offset });

    setEmojiRender([...emojiRender]);
  }, 100);

  return (
    <div className="received-container">
      <EmojiContainer>
        {emojiRender.map(({ key, emoji, offset }) => {
          return (
            <Emojis key={key} offset={offset}>
              {emoji}
            </Emojis>
          );
        })}
      </EmojiContainer>
    </div>
  );
}
const EmojiContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

interface EmojisProps {
  key: number;
  offset: number;
}
const Emojis = styled.div<EmojisProps>`
  @keyframes falldown {
    0% {
      margin-top: 10%;
    }
    100% {
      margin-top: 150%;
    }
  }

  position: absolute;
  top: 30px;
  left: ${(props) => props.offset}px;
  font-size: 30px;
  animation-name: falldown;
  animation-duration: 4s;
`;
