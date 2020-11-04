import styled from "styled-components";

const size = {
  xs: "375px",
  sm: "540px",
  md: "720px",
  lg: "960px",
  xl: "1140px",
};

const device = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
};

const media = {
  xs: (styles) => `
    @media only screen and ${device.xs}{
        ${styles}
    }
    `,
};

// function getWidth(w) {
//   if (!w) return;
//   let width = (w / 12) * 100;
//   return `width: ${width}%; flex: 0 0 ${width};`;
// }

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media ${device.xs} {
    max-width: 100%;
  }
  @media ${device.sm} {
    max-width: 576px;
  }
  @media ${device.md} {
    max-width: 768px;
  }
  @media ${device.lg} {
    max-width: 960px;
  }

  @media ${device.xl} {
    max-width: 1140px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

export const Col = styled.div`
  flex-basis: 0;
  flex: 1;
  flex-grow: 1;
  position: relative;
  padding-right: 15px;
  padding-left: 15px;
`;

// export const Button = styled.button`
//   border: ${props => props.inverted ? '1px solid $primary' : 'none'};
//   border-radius: ${props => '$base-radius'};
//   cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
//   display: inline-block;
//   font-size: ${props =>
//     (props.small && `${$base-font-size * 0.875}`)
//       || (props.large && `${$base-font-size * 1.375}`)
//       || '$base-font-size';
//   };
//   font-weight: ${props => '$font-semibold'};
//   line-height: ${props =>
//     (props.small && '2.2') || (props.large && '1.25') || '2.5'
//   };
//   padding: ${props =>
//     props.large ? '16px 25px 17px' : '0 12px'
//   };
//   position: relative;
//   text-align: center;
//   color: ${props =>
//     (props.inverted && '$primary')
//     || (props.link && '$base-font-color')
//     || '#fff'
//   };
//   background-color: ${props =>
//     (props.primary && '$primary')
//     || (props.danger && '$danger')
//     || ((props.inverted || props.link) && '#fff')
//     || (props.disabled && '$brand-grey')
//   };

//   &:hover {
//     ${props => props.link && 'text-decoration: underline;'}
//   }
// `;
