export default function () {
  const popular = (popularVideo) => {
    const { type, id } = popularVideo;
    if (type === 'YouTube') {
      return `https://www.youtube.com/watch?v=${id}`;
    }
    else if (type === 'Twitch') {
      return `https://www.twitch.tv/videos/${id}`;
    }
  };
  const checkFollow = (item, option) => {
    if (item.hasOwnProperty(option)) {
      if (option === 'YouTube') {
        if (item.YouTube.subscriber.tag === 'has') {
          return item.YouTube.subscriber.count;
        }
        else {
          return '';
        }
      }
      else if (option === 'Twitch') {
        if (item.Twitch.follower.tag === 'has') {
          return item.Twitch.follower.count;
        }
        else {
          return '';
        }
      }
      else {
        return '';
      }
    }
    else {
      return '';
    }
  };
  return {
    popular, checkFollow
  };
};