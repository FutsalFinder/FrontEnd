import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: React.ReactNode;
  size: string;
  color: string;
  fontColor?: string;
  width?: string;
  height?: string;
  border?: string;
  borderRadius?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  size,
  color,
  fontColor,
  width,
  height,
  border,
  borderRadius,
  onClick,
  disabled,
}) => {
  return (
    <ButtonStyle
      size={size}
      color={color}
      fontColor={fontColor}
      width={width}
      height={height}
      border={border}
      borderRadius={borderRadius}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<{
  size: string;
  color: string;
  fontColor?: string;
  width?: string;
  height?: string;
  border?: string;
  borderRadius?: string;
}>`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: ${(props) => props.size};
  background-color: ${(props) => props.color};
  color: ${(props) => props.fontColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  @media (max-width: 768px) {
    font-size: calc(${(props) => props.size} * 0.8);
  }
`;

export default Button;
