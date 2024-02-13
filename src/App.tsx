import classNames from "classnames";
import { Text } from "./components/Text";
import { Translations } from "./translations";
import { EmojiButton } from "./components/EmojiButton";
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  on,
} from "solid-js";
import {
  Emoji,
  EmojiProps,
  angryEmojis,
  emojiSizes,
  kindEmojis,
} from "./components/Emoji";
import { getRandomInt } from "./helpers/getRandomInt";
import { createWindowSize } from "@solid-primitives/resize-observer";

type MousePosition = {
  readonly x: number;
  readonly y: number;
};

type ButtonYesSizes = {
  readonly width: string;
  readonly height: string;
};

type BgEmoji = {
  readonly variant: EmojiProps["variant"];
  readonly size: EmojiProps["size"];
  readonly x: number;
  readonly y: number;
  readonly angle: number;
};

export default function App() {
  const MAX_BG_EMOJIS = 45;
  const MAX_PRESS_NO_BTN = 10;
  const RANGE_SCALE_BTN = 0.05;

  let refYesButton: HTMLButtonElement;

  const [isStartTrackMouse, setStartTrackMouse] = createSignal<boolean>(false);
  const [mousePos, setMousePos] = createSignal<MousePosition>();

  const [btnYesSizes, setBtnYesSizes] = createSignal<ButtonYesSizes>();

  const [isYes, setYes] = createSignal<boolean>(false);

  const [bgEmojis, setBgEmojis] = createSignal<BgEmoji[]>([]);

  const [countPressNo, setCountPressNo] = createSignal<number>(0);

  const size = createWindowSize();

  const isMobile = createMemo(() => size.width < 768);

  createEffect(
    on(isMobile, (isMobile) => isMobile && setStartTrackMouse(false))
  );

  createEffect(
    on(isYes, () => {
      setBgEmojis((prevState) =>
        prevState.map((emoji) => ({
          ...emoji,
          variant: kindEmojis[
            getRandomInt(0, kindEmojis.length - 1)
          ] as EmojiProps["variant"],
        }))
      );
    })
  );

  const handleNo = () => {
    if (isMobile()) {
      setCountPressNo((prev) => prev + 1);
    }

    const emojiSizeKeys = Object.keys(emojiSizes);

    const randomEmoji: BgEmoji = {
      variant: angryEmojis[
        getRandomInt(0, angryEmojis.length - 1)
      ] as EmojiProps["variant"],
      size: emojiSizeKeys[
        getRandomInt(0, emojiSizeKeys.length - 1)
      ] as EmojiProps["size"],
      x: getRandomInt(1, 100),
      y: getRandomInt(1, 100),
      angle: getRandomInt(-30, 30),
    };

    setBgEmojis((prevState) => [...prevState, randomEmoji]);
  };

  createEffect(() => {
    if (refYesButton) {
      setBtnYesSizes({
        width: `${refYesButton.offsetWidth}px`,
        height: `${refYesButton.offsetHeight}px`,
      });
    }
  });

  return (
    <main
      class={classNames(
        [
          "flex",
          "gap-8",
          "items-center",
          "justify-center",
          "h-screen",
          "bg-background",
        ],
        { "flex-col": !isYes() }
      )}
      onMouseMove={(event) =>
        setMousePos({ x: event.clientX, y: event.clientY })
      }
    >
      <Show
        when={!isYes()}
        fallback={
          <>
            <Text class="text-center" variant="bold" size="2xl">
              {Translations.labelMeToo}
            </Text>
            <Emoji variant="face_blowing_a_kiss" />
          </>
        }
      >
        <Text class="text-center" variant="bold" size="2xl">
          {Translations.labelDoYouLoveMe}
        </Text>
        <section
          class={classNames(["flex", "gap-8"])}
          onMouseEnter={() => setStartTrackMouse(!isMobile())}
        >
          <div
            class={classNames({ fixed: isStartTrackMouse() })}
            style={
              isStartTrackMouse()
                ? {
                    top: `${(mousePos()?.y ?? 0) - 28}px`,
                    left: `${(mousePos()?.x ?? 0) - 28}px`,
                  }
                : isMobile()
                ? { scale: 1 + RANGE_SCALE_BTN * countPressNo() }
                : {}
            }
          >
            <EmojiButton
              ref={(el) => (refYesButton = el)}
              checked={isYes()}
              emoji="red_heart"
              onClick={setYes}
            >
              <Text class="text-text-white">{Translations.btnYes}</Text>
            </EmojiButton>
          </div>

          <Show
            when={
              (!isMobile() && bgEmojis().length < MAX_BG_EMOJIS) ||
              (isMobile() && countPressNo() < MAX_PRESS_NO_BTN)
            }
          >
            {/* Temporary divider */}
            <Show when={isStartTrackMouse()}>
              <div style={btnYesSizes()} />
            </Show>

            <div
              style={
                isMobile()
                  ? { scale: 1 - RANGE_SCALE_BTN * countPressNo() }
                  : {}
              }
            >
              <EmojiButton emoji="moai" onClick={handleNo}>
                <Text class="text-text-white">{Translations.btnNo}</Text>
              </EmojiButton>
            </div>
          </Show>
        </section>
      </Show>

      <For each={bgEmojis()}>
        {(emoji) => (
          <div
            class="fixed"
            style={{
              top: `${emoji.y}%`,
              left: `${emoji.x}%`,
              rotate: `${emoji.angle}deg`,
            }}
          >
            <Emoji variant={emoji.variant} size={emoji.size} />
          </div>
        )}
      </For>
    </main>
  );
}
