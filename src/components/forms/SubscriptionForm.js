import React from 'react'

class SubscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        emailValue: '',
    };
  }

    render() {
        return (
                <form action="https://liagame.us19.list-manage.com/subscribe/post" method="POST" noValidate>
                  <input type="hidden" name="u" value="93687b28d61c7cec37fd5237e"/>
                  <input type="hidden" name="id" value="5692666884"/>
                  <label htmlFor='MERGE0'>
                    Email
                    <input
                      type="email"
                      name="EMAIL"
                      id="MERGE0"
                      value={this.state.emailValue}
                      onChange={ (e)=>{this.setState({emailValue: e.target.value});} }
                      autoCapitalize="off"
                      autoCorrect="off"
                    />
                  </label>
                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/>

                  <div style={{position: 'absolute', left: '-5000px'}} aria-hidden='true' aria-label="Please leave the following three fields empty">
                      <label htmlFor="b_name">Name: </label>
                      <input type="text" name="b_name" tabIndex="-1" value="" placeholder="Freddie" id="b_name"/>

                      <label htmlFor="b_email">Email: </label>
                      <input type="email" name="b_email" tabIndex="-1" value="" placeholder="youremail@gmail.com" id="b_email"/>

                      <label htmlFor="b_comment">Comment: </label>
                      <textarea name="b_comment" tabIndex="-1" placeholder="Please comment" id="b_comment"></textarea>
                  </div>
              </form>
        )
    }
}

export default SubscriptionForm;
