import React, {useEffect, useState} from 'react';
import {Router} from './router'
import {Layout, Button, ScrolledArea} from './components/styled';


const App: React.FC = () => {

    return (
        <Layout>
            <ScrolledArea>
                <Router/>
            </ScrolledArea>
        </Layout>
    );
}

export default App;
