import classNames from "classnames";
import { Component, JSX, JSXElement, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

const textVariants = {
  base: "font-light",
  bold: "font-bold",
};

const textSizes = {
  sm: "text-sm",
  base: "text-base",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

type ParentType = JSX.DOMAttributes<
  | HTMLSpanElement
  | HTMLParagraphElement
  | HTMLLabelElement
  | HTMLDivElement
  | HTMLHeadingElement
  | HTMLAnchorElement
>;

type TextProps = ParentType & {
  readonly ref?: (el: HTMLElement) => void;

  readonly class?: string;
  readonly variant?: keyof typeof textVariants;
  readonly size?: keyof typeof textSizes;

  readonly as?:
    | "span"
    | "p"
    | "label"
    | "div"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "a"
    | "summary"
    | "legend"
    | "u";

  readonly children: JSXElement;
};

export const Text: Component<TextProps> = (props) => {
  const propsWithDefault = mergeProps(
    {
      as: "span",
      variant: "base",
      size: "base",
    } as Required<TextProps>,
    props
  );

  const [localProps, otherProps] = splitProps(propsWithDefault, [
    "as",
    "class",
    "variant",
    "size",
    "children",
  ]);

  return (
    <Dynamic
      component={localProps.as}
      class={classNames([
        "font-eUkraine",
        "text-text-base",
        textVariants[localProps.variant],
        textSizes[localProps.size],
        localProps.class,
      ])}
      {...otherProps}
    >
      {localProps.children}
    </Dynamic>
  );
};
