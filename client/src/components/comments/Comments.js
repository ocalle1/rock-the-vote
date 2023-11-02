import React, { useState, useContext, useEffect } from 'react';
import { IssueContext } from '../../context/IssueProvider.js';



export default function Comments(props) {

    const { 
        getAllComments,
        addCommentRoExistingIssue,
        comments } = useContext(IssueContext);

return (
    <textarea>
        
    </textarea>
)

}