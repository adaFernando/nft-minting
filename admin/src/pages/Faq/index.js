import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import react, { useEffect, useState } from 'react';

import { createNewFaq, getFaqs, updateFaq } from '../../actions/faq';
import { NotificationManager } from 'react-notifications'
import { useDispatch } from 'react-redux';
import {
    SET_CREATESUCCESS_DEFAULT, SET_UPDATESUCCESS_DEFAULT
} from '../../types';

function Faq({createNewFaq, getFaqs, faqs, loading, createSuccess, updateFaq, updateSuccess,}) {

    const [newFaq, setNewFaq] = useState({
        question: "",
        answer: ""
    });
   const [stateFaps, setStateFaqs] = useState([])
   const [isEmpty, setIsEmpty] = useState({
        question: false,
        answer: false
   })
   const dispatch = useDispatch();
    useEffect(()=> {
        getFaqs()
        setStateFaqs(faqs)
        dispatch({
            type: SET_CREATESUCCESS_DEFAULT
        })
        dispatch({
            type: SET_UPDATESUCCESS_DEFAULT
        })
        console.log("1")
    }, [loading])

    useEffect(()=> {
        console.log("2")
        setStateFaqs(faqs)
        console.log("changed stateFaqs")
    }, [faqs])

    useEffect(()=> {
        console.log("3")

        if(createSuccess == 1)
             NotificationManager.success( "Completed adding new FAQ", 'Success')
        //  else  NotificationManager.error( "Something error occurs", 'Danger')
    },[createSuccess])

    useEffect(()=> {
        console.log("updateSuccess Updated -----------------", updateSuccess)
        if(updateSuccess == 1)
          NotificationManager.success( "Updated Successfully", 'Success')
    }, [updateSuccess])
    const onHandleChange = (e) => {

        setNewFaq({
            ...newFaq,
            [e.target.name]: e.target.value
        })  
        setIsEmpty(
            {
                question: 0,
                answer: 0
            }
        )
    }
    const onClickSubmit = () => {
        if(newFaq.question && newFaq.answer){
            createNewFaq(newFaq)
            setNewFaq({
                question: "",
                answer: ""
            })
            if(createSuccess == 1){
                NotificationManager.success( "Completed adding new FAQ", 'Success')
            }
            setIsEmpty({question: 0, answer: 0})
        }
        else  {
            NotificationManager.warning( "Empty Value is not allowed", 'Warning' )  
            let temp = {question: "", answer: ""}
            if(!newFaq.question) 
               temp.question = true
            if(!newFaq.answer) 
               temp.answer = true
            setIsEmpty(temp)
        }
    }
    const onEdit = (e, item) => {
        console.log("onEdit----------", item)
        let newArr = [...stateFaps]
        newArr.map((fap)=>{
            if(fap._id === item._id){
                console.log(fap.id)
                fap[e.target.name] = e.target.value
            }
        })
        setStateFaqs(newArr)
    }
    const onClickChangeSubmit = (item) => {
        if(!item.question || !item.answer){
            NotificationManager.warning( "Empty Value is not allowed", 'Warning' )  
            return 0
        }
        console.log(item)
        updateFaq(item._id, item.question, item.answer)
    }
    return (
        <div className='fade-in'>
           <h1 class="display-5 text-yellow faq__title m-3">Change FAQ</h1>
            <div className="">
            {stateFaps && stateFaps.map((item, index) => {
                return (
                <div class="d-flex justify-content-evenly mb-2">
                    <textarea className="textarea" name="question" rows="4" id="question_new"  value={item.question} onChange={(e)=> onEdit(e, item)}></textarea>
                    <textarea className="textarea" name="answer" id="answer_new" value={item.answer} onChange={(e)=> onEdit(e, item)}></textarea>
                    <button class="sign__btn" onClick={() => onClickChangeSubmit(item)}>Change</button>
                </div>
                )
            })}
            <div class="d-flex justify-content-evenly mb-2">
                {!isEmpty.question ? 
                (
                <textarea className="textarea" name="question" rows="4" id="question_new" onChange={onHandleChange} value={newFaq.question}></textarea>
                ): 
                (
                <textarea className="textarea" name="question" rows="4" style={{borderColor:"red"}} id="question_new" onChange={onHandleChange} value={newFaq.question}></textarea>
                )}
                {!isEmpty.answer ? 
                (
                <textarea className="textarea" name="answer" id="answer_new" onChange={onHandleChange} value={newFaq.answer}></textarea>
                ): 
                (
                <textarea className="textarea" name="answer" id="answer_new" style={{borderColor:"red"}} onChange={onHandleChange} value={newFaq.answer}></textarea>
                )}
                <button class="sign__btn" onClick={onClickSubmit}>AddNew</button>
            </div>
            </div>
        </div>
    );
}
  
Faq.propTypes = {
    createNewFaq: PropTypes.func.isRequired,
    getFaqs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    faqs: state.faqReducer.faqs,
    loading: state.faqReducer.loading,
    createSuccess: state.faqReducer.createSuccess,
    updateSuccess: state.faqReducer.updateSuccess
});

export default connect(mapStateToProps, {createNewFaq, getFaqs, updateFaq})(Faq);

