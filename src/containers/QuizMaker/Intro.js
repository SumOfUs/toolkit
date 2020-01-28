import React from 'react';
import { Textarea, Form } from 'react-bulma-components';
import ImageUpload from '../ImageUpload';
const Intro = props => (
  <div className="section">
    <div className="container">
      <h1 className="title is-3">Glorious Quiz Maker</h1>
      <Form.Field>
        <label className="label">Title</label>
        <Form.Input
          className="is-large"
          type="text"
          name="title"
          onChange={props.handleContentChange}
          value={props.quiz.title || ''}
        />
      </Form.Field>
      <Form.Field>
        <label className="label">Subtitle</label>
        <Form.Input
          className="is-large"
          type="text"
          name="subtitle"
          onChange={props.handleContentChange}
          value={props.quiz.subtitle || ''}
        />
      </Form.Field>
      <Form.Field>
        <ImageUpload
          quizId={props.quiz.id}
          objectKey={'intro'}
          saveImage={props.saveIntroImage}
          image={props.quiz.introImagePath}
        />
      </Form.Field>

      <h1 className="title is-3">Action</h1>
      <Form.Field>
        <label className="label">Campaign Page Slug</label>
        <Form.Input
          name="actionSlug"
          className="is-medium"
          type="text"
          onChange={props.handleContentChange}
          value={props.quiz.actionSlug || ''}
        />
      </Form.Field>
      <Form.Field>
        <label className="label">Action Form Accompanying Text</label>
        <Textarea
          name="actionText"
          className="is-medium"
          type="text"
          onChange={props.handleContentChange}
          value={props.quiz.actionText || ''}
        />
      </Form.Field>

      <Form.Field>
        <ImageUpload
          quizId={props.quiz.id}
          objectKey={'action'}
          section="actionImagePath"
          saveImage={props.saveQuizImage}
          image={props.quiz.actionImagePath}
        />
      </Form.Field>
    </div>
  </div>
);

export default Intro;
