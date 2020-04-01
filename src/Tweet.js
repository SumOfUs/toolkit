import React from 'react';
import { Content, Icon, Box, Media, Level } from 'react-bulma-components';

const Tweet = props => (
  <Box>
    <Media>
      <Media.Content>
        <Content>
          <p>{props.text}</p>
        </Content>
        <Level small="true">
          <Level.Side align="left">
            <Level.Item onClick={props.handleDelete.bind(this, props.index)}>
              <Icon small>
                <i className="fa fa-trash" />
              </Icon>
            </Level.Item>
          </Level.Side>
        </Level>
      </Media.Content>
    </Media>
  </Box>
);

export default Tweet;
