// @flow

import React from 'react';
import classnames from 'classnames';
import { Button } from 'react-bulma-components';

type Props = {
  currentLanguage: string;
  onChange: (lang: string) => void;
};

export default function SwitchLanguage({ currentLanguage, onChange }: Props) {
  return (
    <nav className="SwitchLanguage">
      <Button
        style={{ margin: 'auto .5em' }}
        className={buttonClass('en', currentLanguage)}
        onClick={() => onChange('en')}
      >
        En
      </Button>
      <Button
        style={{ margin: 'auto .5em' }}
        className={buttonClass('fr', currentLanguage)}
        onClick={() => onChange('fr')}
      >
        Fr
      </Button>
      <Button
        style={{ margin: 'auto .5em' }}
        className={buttonClass('de', currentLanguage)}
        onClick={() => onChange('de')}
      >
        De
      </Button>
      <Button
        style={{ margin: 'auto .5em' }}
        className={buttonClass('es', currentLanguage)}
        onClick={() => onChange('es')}
      >
        Es
      </Button>
      <Button
        style={{ margin: 'auto .5em' }}
        className={buttonClass('pt', currentLanguage)}
        onClick={() => onChange('pt')}
      >
        Pt
      </Button>
      <Button
        style={{ margin: 'auto .5em' }}
        className={buttonClass('nl', currentLanguage)}
        onClick={() => onChange('nl')}
      >
        Nl
      </Button>
    </nav>
  );
}

function buttonClass(language: string, currentLanguage: string): string {
  return classnames({
    'is-small': true,
    'is-white': true,
    'is-light': language === currentLanguage,
  });
}
