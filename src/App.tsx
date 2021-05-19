import {Modal, notification} from 'antd';

const mayThrowFactory = (errMsg: string) => (probability = Math.random()) => {
  if (probability < 0.5) {
    throw new Error(errMsg);
  }
};

const tryAdamantium = mayThrowFactory('Adamantium was taken by someone else');
const tryPlatinum = mayThrowFactory('Platinum was taken by someone else');
const tryGold = mayThrowFactory('Gold was taken by someone else');
const trySilver = mayThrowFactory('Silver was taken by someone else');
const tryBronze = mayThrowFactory('Bronze was taken by someone else');

type SuccessResponse = {
  error: false;
  medal: string;
};

type ErrorResponse = {
  error: true;
  message: string;
};

type Response = SuccessResponse | ErrorResponse;

const participateInOlympics = (): Response => {
  try {
    tryGold();
  } catch (err) {
    notification.error({
      message: 'Failed to get gold',
      description: err.message,
    });

    try {
      trySilver();
    } catch (err) {
      notification.error({
        message: 'Failed to get silver',
        description: err.message,
      });

      try {
        tryBronze();
      } catch (err) {
        notification.error({
          message: 'Failed to get any medal',
          description: err.message,
        });

        return {error: true, message: 'Failed to get any medal'};
      }

      notification.success({message: 'Got bronze'});
      return {error: false, medal: 'bronze'};
    }

    notification.success({message: 'Got silver'});
    return {error: false, medal: 'silver'};
  }

  notification.success({
    message: 'Got gold',
    // description: localStorage.get('userId'), // Deliberate error
  });

  try {
    tryPlatinum();
  } catch (err) {
    notification.error({
      message: 'Failed to get platinum',
      description: err.message,
    });

    return {error: false, medal: 'gold'};
  }

  notification.success({message: 'Got platinum'});

  try {
    tryAdamantium();
  } catch (err) {
    notification.error({
      message: 'Failed to get adamantium',
      description: err.message,
    });

    return {error: false, medal: 'platinum'};
  }

  notification.success({message: 'Got adamantium'});
  return {error: false, medal: 'adamantium'};
};

const participateInOlympics2 = (): Response => {
  try {
    tryGold();

    notification.success({
      message: 'Got gold',
      // description: localStorage.get('userId'), // Deliberate error
    });

    try {
      tryPlatinum();
      notification.success({message: 'Got platinum'});

      try {
        tryAdamantium();
        notification.success({message: 'Got adamantium'});
        return {error: false, medal: 'adamantium'};
      } catch (err) {
        notification.error({
          message: 'Failed to get adamantium',
          description: err.message,
        });

        return {error: false, medal: 'platinum'};
      }
    } catch (err) {
      notification.error({
        message: 'Failed to get platinum',
        description: err.message,
      });

      return {error: false, medal: 'gold'};
    }
  } catch (err) {
    notification.error({
      message: 'Failed to get gold',
      description: err.message,
    });

    try {
      trySilver();
      notification.success({message: 'Got silver'});
      return {error: false, medal: 'silver'};
    } catch (err) {
      notification.error({
        message: 'Failed to get silver',
        description: err.message,
      });

      try {
        tryBronze();
        notification.success({message: 'Got bronze'});
        return {error: false, medal: 'bronze'};
      } catch (err) {
        notification.error({
          message: 'Failed to get any medal',
          description: err.message,
        });

        return {error: true, message: 'Failed to get any medal'};
      }
    }
  }
};

const res = participateInOlympics();

if (res.error) {
  Modal.error({title: res.message});
} else {
  Modal.success({title: `Congratulations with winning the ${res.medal}!`});
}

const App = () => <></>;
export default App;
