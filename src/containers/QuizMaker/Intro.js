import React from 'react';
import {Textarea, Field, Input } from 'reactbulma'
import ImageUpload from '../ImageUpload';
const Intro = (props) => (
  <div className='section'>
    <div className='container'>
      <h1 className='title is-3'>Glorious Quiz Maker</h1>
      <Field>
        <label className="label">Title</label>
        <Input className='is-large' type='text' name='title' onChange={ props.handleContentChange } value={props.quiz.title || ''} />
      </Field>
      <Field>
        <label className="label">Subtitle</label>
        <Input className='is-large' type='text' name='subtitle' onChange={ props.handleContentChange } value={props.quiz.subtitle || ''} />
      </Field>
      <Field>
        <ImageUpload quizId={props.quiz.id}  objectKey={'intro'} saveImage={ props.saveIntroImage } image={props.quiz.introImagePath} />
      </Field>

      <h1 className='title is-3'>Action</h1>
      <Field>
        <label className="label">Campaign Page Slug</label>
        <Input name='actionSlug' className='is-medium' type='text' onChange={props.handleContentChange} value={props.quiz.actionSlug || ''} />
      </Field>
      <Field>
        <label className="label">Action Form Accompanying Text</label>
        <Textarea name='actionText' className='is-medium' type='text' onChange={ props.handleContentChange } value={props.quiz.actionText || ''} />
      </Field>

      <Field>
        <ImageUpload
          quizId={props.quiz.id}
          objectKey={'action'}
          section='actionImagePath'
          saveImage={ props.saveQuizImage }
          image={props.quiz.actionImagePath} />
      </Field>
    </div>
  </div>
);

export default Intro;
