// @flow

import React from 'react';
import classnames from 'classnames';
import { Button } from 'reactbulma';

type Props = {
  currentLanguage: string,
  onChange: (lang: string) => void,
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
    </nav>
  );
}

function buttonClass(language: string, currentLanguage: string): boolean {
  return classnames({
    'is-small': true,
    'is-white': true,
    'is-light': language === currentLanguage,
  });
}
