import PropTypes from 'prop-types';
import styles from './Media.module.css';

// HTML5 video wrapper with native play/pause controls and fallback content.
const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <div className={styles.videoContainer}>
      <h3>{title}</h3>
      <video controls width="100%" className={styles.video}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
};

VideoPlayer.defaultProps = {
  title: 'Cooking Tutorial',
};

export default VideoPlayer;
