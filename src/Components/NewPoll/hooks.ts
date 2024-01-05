import { useEffect, useState } from "react";
import { IOptionItem } from "../../interface";

//question exceed handle hook
function useQuestionLimited(question: string, limitValue: number = 255) {
    const [limitHint, setLimitHint] = useState('');
    useEffect(() => {
        const questionLength = question.length;
        if (questionLength > 100) {
            const remainLength = limitValue - questionLength;
            setLimitHint(`${remainLength}`);
        }
    }, [limitValue, question.length]);
    return question.length > 100 ? limitHint : '';
}

function checkNewPollValidate(question: string, optionsList: IOptionItem[], maxQuestionLength: number) {
    const validOption = optionsList.filter((item) => !!item.text);
    const isQuestionValidate = question.length > 0 && question.length < maxQuestionLength;
    //check question
    if (!isQuestionValidate) {
        return {
            isValidate: false,
            errorMessage: 'question length does not fit the requirement'
        }
    }
    //check options
    const isOptionsValidate = validOption.length >= 2;
    if (!isOptionsValidate) {
        return {
            isValidate: false,
            errorMessage: 'Options number should more than 2'
        }
    }
    return {
        isValidate: true,
        validOption
    }
}

export {
    useQuestionLimited,
    checkNewPollValidate
}