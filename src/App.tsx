import React from 'react';
import './App.css';

const testData = [
    {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"}]

const CardList = (props: { profileData: CardProps[]; }) => (
    <div>
        {props.profileData.map(value => <Card {...value}/>)}
    </div>
);


class CardProps {
    name: string = '';
    avatar_url: string = '';
    company: string = ''
}

export class Form extends React.Component {

    private userNameInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    state = {username: ''}

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(this.state.username);
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="GitHub Username"
                    value={this.state.username}
                    onChange={event => this.setState({username: event.target.value})}
                    required/>
                <button>Add new Card</button>
            </form>
        );
    }
}

export class Card extends React.Component<CardProps> {
    render() {
        return (
            <div className="github-profile" style={{margin: '1rem'}}>
                <img src={this.props.avatar_url}/>
                <div className="info" style={{display: 'inline-block', marginLeft: 10}}>
                    <div className="name" style={{fontSize: '125%'}}>{this.props.name}</div>
                    <div className="company">{this.props.company}</div>
                </div>
            </div>
        );
    }
}

export class App extends React.Component {

    /*constructor(props: { profiles: CardProps[]}) {
        super(props);
        this.state = {
            profiles: testData,
        };
    }*/
    state = {
        profiles: testData,
    }

    render() {
        return (
            <>
            <div className="header">
            The Github Cards App
            </div>
            <Form/>
            <CardList profileData={this.state.profiles}/>
            </>
        );
    }
}
