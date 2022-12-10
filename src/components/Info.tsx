import React from "react";
import styled from "styled-components";

export const Info: React.FC = () => {
    return (
        <StyledHead>
            <h1>TestEcommerce.az</h1>
            <p>
                TestEcommerce Azərbaycanda yaradılan yerli markadır. Hansı ki, trendi və milli dizaynı yüksək
                qiymətləndirir.
                sizə milli rənglərlə, yeni estetika ilə evinizə rahatlıq və yaxınlıq gətirən, mətbəxt
                ləvazimatlarından yataq dəstlərinə qədər geniş məhsulları təklif edir. TestEcommerce, müştəri
                məmnuniyyətinə diqqət yetirərək evdə ehtiyyac duyduğunuz hər şey üçün məhz "zövqlü, milli və
                sərfəli" şüarından istifadə edir.
            </p>
            <p>
                Contact us: <strong>info@testecommerce.az</strong>
            </p>
        </StyledHead>
    )
}

export const StyledHead = styled.div`
  letter-spacing: .7px;

  h1 {
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 400;
  }
`
