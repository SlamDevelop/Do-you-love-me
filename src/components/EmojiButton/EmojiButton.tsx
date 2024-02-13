import { Component, JSXElement, Show } from "solid-js";
import { Emoji, EmojiProps } from "../Emoji";
import classNames from "classnames";
import { createWritableMemo } from "~/hooks/memo";

type EmojiButtonProps = {
  readonly ref?: (el: HTMLButtonElement) => void;

  readonly class?: string;
  readonly checked?: boolean;

  readonly emoji: EmojiProps["variant"];

  readonly children: JSXElement;

  readonly onClick: (isChecked: boolean) => void;
};

export const EmojiButton: Component<EmojiButtonProps> = (props) => {
  const [isChecked, setChecked] = createWritableMemo<boolean>(
    () => props.checked ?? false
  );

  const handleChecked = () => props.onClick(setChecked((value) => !value));

  return (
    <button
      ref={props.ref}
      type="button"
      class={classNames([
        "p-3",
        "bg-main-black",
        "flex",
        "items-center",
        "justify-center",
        "gap-3",
        "rounded-3xl",

        props.class,
      ])}
      onClick={handleChecked}
    >
      <div
        class={classNames([
          "flex",
          "items-center",
          "justify-center",
          "w-8",
          "h-8",
          "ring-1",
          "ring-main-rose",
          "rounded-lg",
          "duration-200",
          "hover:ring-main-pink",

          "focus-within:ring-2",
          "focus-within:ring-main-pink",

          { "ring-main-pink ring-2": isChecked() },
        ])}
      >
        <Show when={isChecked()}>
          <Emoji variant={props.emoji} size="md" />
        </Show>
      </div>

      {props.children}
    </button>
  );
};
