import React from 'react';
import './App.css';
import Axios from "axios";

const axiosInstance = Axios.create();

const CardList = (props: { profileData: CardProps[]; }) => (
    <div>
        {props.profileData.map(value => <Card key={value.id} {...value}/>)}
    </div>
);


class CardProps {
    name: string = '';
    avatar_url: string = '';
    company: string = ''
    id: string = '';
}

class FormProps {
    onSubmit = (data: any): void => {
    };
}

export class Form extends React.Component<FormProps> {

    state = {username: ''}
    handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            let response = await axiosInstance.get(`https://api.github.com/users/${this.state.username}`);
            this.props.onSubmit(response.data);
        } catch (e) {
            console.error(e);
        }
        this.setState({username: ''})
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
                <img src={this.props.avatar_url} alt='profile' style={{height:150, width:150}}/>
                <div className="info" style={{display: 'inline-block', marginLeft: 10}}>
                    <div className="name" style={{fontSize: '125%'}}>{this.props.name}</div>
                    <div className="company">{this.props.company}</div>
                </div>
            </div>
        );
    }
}

export class App extends React.Component {

    state = {
        profiles: [],
    }

    addNewProfile = (profileData: any) => {
        this.setState(prevState => ({
            // @ts-ignore
            profiles: [...prevState.profiles, profileData],
        }));
    }

    render() {
        return (
            <>
            <div className="header">
            The Github Cards App
            </div>
            <Form onSubmit={this.addNewProfile}/>
            <CardList profileData={this.state.profiles}/>
            </>
        );
    }
}
