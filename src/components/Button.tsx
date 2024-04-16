import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string;
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
  width?: string;
  height?: string;
  border?: string;
  borderRadius?: string;
}>`
  cursor: ${(props) =>
    props.disabled ? "not-allowed" : "pointer"}; // disabled 일 때 커서 변경
  font-size: ${(props) => props.size};
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  opacity: ${(props) =>
    props.disabled ? 0.5 : 1}; // disabled 일 때 투명도 변경
`;

export default Button;
