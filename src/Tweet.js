import React from 'react';
import { Content, Icon, Box, Media, Level } from 'react-bulma-components';

const Tweet = props => (
  <Box>
    <Media>
      <Media.Content>
        <Content>
          <p>{props.text}</p>
        </Content>
        <Level mobile>
          <Level.Left>
            <Level.Item onClick={props.handleDelete.bind(this, props.index)}>
              <Icon small>
                <i className="fa fa-trash" />
              </Icon>
            </Level.Item>
          </Level.Left>
        </Level>
      </Media.Content>
    </Media>
  </Box>
);

export default Tweet;
