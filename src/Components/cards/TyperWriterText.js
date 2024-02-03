import React from 'react';
import Typewriter from 'typewriter-effect';

export default function TyperWriterText({ text }) {
    return (
        <div style={{textAlign:"center", fontWeight:"bolder",fontSize:"25px", color:'red' }}>
            <Typewriter options={{
                strings: text,
                autoStart: true,
                loop: true
            }} />
        </div>
    );
}
