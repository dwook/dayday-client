import React from 'react';
import Diary from '../components/Diary';

export const GoodScreen = props => <Diary type={'good'} />;
export const BadScreen = props => <Diary type={'bad'} />;
export const PlanScreen = props => <Diary type={'plan'} />;
