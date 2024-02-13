import classNames from "classnames";
import { Text } from "./components/Text";
import { Translations } from "./translations";
import { EmojiButton } from "./components/EmojiButton";
import { Show, createEffect, createSignal } from "solid-js";
import { Emoji } from "./components/Emoji";

type MousePosition = {
  readonly x: number;
  readonly y: number;
};

type ButtonYesSizes = {
  readonly width: string;
  readonly height: string;
};

export default function App() {
  let refYesButton: HTMLButtonElement;

  const [isStart, setStart] = createSignal<boolean>(false);
  const [mousePos, setMousePos] = createSignal<MousePosition>();

  const [btnYesSizes, setBtnYesSizes] = createSignal<ButtonYesSizes>();

  const [isYes, setYes] = createSignal<boolean>(false);

  const handleNo = () => {};

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
          "gap-6",
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
            <Text variant="bold" size="2xl">
              {Translations.labelMeToo}
            </Text>
            <Emoji variant="face_blowing_a_kiss" />
          </>
        }
      >
        <Text variant="bold" size="2xl">
          {Translations.labelDoYouLoveMe}
        </Text>
        <section
          class={classNames(["flex", "gap-6"])}
          onMouseEnter={() => setStart(true)}
        >
          <div
            class={classNames({ fixed: isStart() })}
            style={
              isStart()
                ? {
                    top: `${(mousePos()?.y ?? 0) - 28}px`,
                    left: `${(mousePos()?.x ?? 0) - 28}px`,
                  }
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

          {/* Temporary divider */}
          <Show when={isStart()}>
            <div style={btnYesSizes()} />
          </Show>

          <EmojiButton emoji="moai" onClick={handleNo}>
            <Text class="text-text-white">{Translations.btnNo}</Text>
          </EmojiButton>
        </section>
      </Show>
    </main>
  );
}
