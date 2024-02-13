import classNames from "classnames";
import { Component, mergeProps } from "solid-js";
import emoji_angry_face_with_horns from "~/assets/emoji/angry-face-with-horns.png";
import emoji_angry_face from "~/assets/emoji/angry-face.png";
import emoji_broken_heart from "~/assets/emoji/broken-heart.png";
import emoji_face_blowing_a_kiss from "~/assets/emoji/face-blowing-a-kiss.png";
import emoji_face_screaming_in_fear from "~/assets/emoji/face-screaming-in-fear.png";
import emoji_heart_on_fire from "~/assets/emoji/heart-on-fire.png";
import emoji_mending_heart from "~/assets/emoji/mending-heart.png";
import emoji_moai from "~/assets/emoji/moai.png";
import emoji_pouting_face from "~/assets/emoji/pouting-face.png";
import emoji_red_heart from "~/assets/emoji/red-heart.png";
import emoji_smiling_face_with_heart_eyes from "~/assets/emoji/smiling-face-with-heart-eyes.png";
import emoji_smiling_face_with_hearts from "~/assets/emoji/smiling-face-with-hearts.png";

export const kindEmojis = [
  "heart_on_fire",
  "mending_heart",
  "red_heart",
  "smiling_face_with_heart_eyes",
  "smiling_face_with_hearts",
];

export const angryEmojis = [
  "angry_face_with_horns",
  "angry_face",
  "broken_heart",
  "face_screaming_in_fear",
  "moai",
  "pouting_face",
];

export const emojis = {
  angry_face_with_horns: emoji_angry_face_with_horns,
  angry_face: emoji_angry_face,
  broken_heart: emoji_broken_heart,
  face_blowing_a_kiss: emoji_face_blowing_a_kiss,
  face_screaming_in_fear: emoji_face_screaming_in_fear,
  heart_on_fire: emoji_heart_on_fire,
  mending_heart: emoji_mending_heart,
  moai: emoji_moai,
  pouting_face: emoji_pouting_face,
  red_heart: emoji_red_heart,
  smiling_face_with_heart_eyes: emoji_smiling_face_with_heart_eyes,
  smiling_face_with_hearts: emoji_smiling_face_with_hearts,
};

export const emojiSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-10 h-10",
};

export type EmojiProps = {
  readonly class?: string;
  readonly variant: keyof typeof emojis;
  readonly size?: keyof typeof emojiSizes;
};

export const Emoji: Component<EmojiProps> = (props) => {
  const propsWithDefault = mergeProps(
    {
      size: "lg",
    } as Required<EmojiProps>,
    props
  );

  return (
    <img
      class={classNames([
        emojiSizes[propsWithDefault.size],
        propsWithDefault.class,
      ])}
      src={emojis[propsWithDefault.variant]}
      alt={`emoji_${propsWithDefault.variant}`}
    />
  );
};
