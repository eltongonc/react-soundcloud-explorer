import React from 'react';

const Chat = () => (
	<aside className="offscreen">
		<span>Toggle chat</span>
		<ol>
			<li>
				<p>Hey!</p>
				<footer>
					<p>Posted on <time datatime="2015-01-22T10:25">10:25 AM</time> by you</p>
					<p data-status="READ">Has been read</p>
				</footer>
			</li>
			<li>
				<p>Hey! Sorry I was busy</p>
				<footer>
					<p>Posted on <time datatime="2017-02-03T14:19">2:19 PM</time> by John</p>
				</footer>
			</li>
			<li>
				<p>I sent that 2 years ago</p>
				<footer>
					<p>Posted on <time datatime="2017-02-03T14:22">2:22 PM</time> by you</p>
					<p data-status="DELIVERED">Has been delivered</p>
				</footer>
			</li>
		</ol>

		<form action="#" method="post">
			<textarea name="field-message" id="field-message"></textarea>
			<label htmlFor="field-message">Message</label>
			<button type="submit">Send</button>
		</form>
	</aside>
);

export default Chat