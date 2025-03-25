import React from 'react';

type State = {
  today: Date;
  clockName: string;
};

type Props = {
  name: string;
  onNameChange: (name: string) => void;
};

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export class Clock extends React.Component<Props, State> {
  state: Readonly<State> = {
    today: new Date(),
    clockName: this.props.name,
  };

  timerId: number | null = null;

  nameTimerId: number | null = null;

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      const currentTime = new Date();

      this.setState({ today: currentTime });

      // eslint-disable-next-line no-console
      console.log(currentTime.toUTCString().slice(-12, -4));
    }, 1000);

    this.nameTimerId = window.setInterval(() => {
      const newName = getRandomName();
      const oldName = this.state.clockName;

      this.setState(() => ({
        clockName: newName,
      }));
      this.props.onNameChange(newName);

      // eslint-disable-next-line no-console
      console.log(`Renamed from ${oldName} to ${newName}`);
    }, 3300);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    if (this.nameTimerId) {
      clearInterval(this.nameTimerId);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.state.clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          {this.state.today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
