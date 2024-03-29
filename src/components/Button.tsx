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
  cursor: pointer;
  font-size: ${(props) => props.size};
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
`;

export default Button;
