import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import S3 from 'aws-sdk/clients/s3';
import { saveQuiz } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      uploading: false,
    };
  }

  upload(data) {
    Auth.currentCredentials().then(credentials => {
      const key = `quiz/${this.props.quizId}/${this.props.objectKey}/raw/${
        data.name
      }`;

      let params = {
        Bucket: 'sumofus.org.quiz',
        Key: key,
        Body: data,
      };

      let s3 = new S3({
        apiVersion: '2013-04-01',
        region: 'us-west-2',
        credentials: Auth.essentialCredentials(credentials),
      });

      var request = s3.putObject(params);

      request.on(
        'httpUploadProgress',
        function(progress) {
          const { loaded, total } = progress;

          let percentage = parseInt((loaded / total) * 100, 10);

          let newState = {
            progress: percentage,
          };

          if (percentage >= 100) {
            newState.uploading = false;
            setTimeout(() => {
              this.props.saveImage({
                section: this.props.section,
                id: this.props.id,
                path: data.name,
              });
              this.props.saveQuiz();
            }, 500);
          }

          this.setState(newState);
        }.bind(this)
      );

      request.send();
      this.setState({ uploading: true });
    });
  }

  uploading() {
    return this.state.uploading ? (
      <progress
        className="progress is-small is-info"
        value={this.state.progress}
        max="100"
      />
    ) : (
      ''
    );
  }

  renderPicker() {
    const uploading = this.uploading();

    return (
      <div>
        {uploading}
        <div className="file is-boxed">
          <label className="file-label">
            <input
              onChange={e => {
                this.upload(e.target.files[0]);
              }}
              className="file-input"
              type="file"
              name="resume"
            />
            <span className="file-cta">
              <span className="file-label">Choose a photo</span>
            </span>
          </label>
        </div>
      </div>
    );
  }

  renderImage() {
    if (!this.props.image) return '';

    const key = `quiz/${this.props.quizId}/${this.props.objectKey}/raw/${
      this.props.image
    }`;
    const path = `https://s3-us-west-2.amazonaws.com/sumofus.org.quiz/${key}`;

    return (
      <p>
        <img alt="quiz" width="100" height="100" src={path} />
      </p>
    );
  }

  render() {
    return (
      <div>
        {this.renderImage()}
        {this.renderPicker()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveQuiz,
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(ImageUpload);
