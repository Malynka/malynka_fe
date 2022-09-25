import styled from "styled-components";

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SwitchIndicator = styled.label<{ disabled?: boolean }>`
  display: inline-block;
  position: relative;
  width: 78px;
  height: 36px;
  border-radius: 18px;

  ${({ disabled }) => (disabled ? 'opacity: .5;' : null)}
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: .4s;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.primary.light};

  ::before {
    position: absolute;
    content: '';
    width: 24px;
    height: 24px;
    border-radius: 50%;
    left: 6px;
    bottom: 6px;
    background-color: ${props => props.theme.colors.primary.dark};
    transition: .4s;
  }
`;

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  :checked {
    width: 100px;
  }

  :checked + span {
  }

  :checked + ${Slider}::before {
    transform: translateX(42px);
  }

  :disabled + ${Slider} {
    cursor: not-allowed;
  }
`;