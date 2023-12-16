import React, { useEffect, useState } from "react";
import iconDrag from '../../images/icon-drag-and-drop.svg'
import iconLink from '../../images/icon-link.svg'
import IconGithubMultiColor from "../svg/IconGithub";
import IconFacebookMultiColor from "../svg/IconFacebook";
import IconYoutubeMultiColor from "../svg/IconYoutube";
import IconGithub from "../../images/icon-github2.svg";
import IconYoutube from "../../images/icon-youtube2.svg";
import IconFacebook from "../../images/icon-facebook2.svg";

const AddLink = ({removeLink, id, selected = null}) => {

   const [selectValue, setSelectValue] = useState(selected && selected.length > 0 ? selected : 'Select a platform')
   const [selectImg, setSelectImg] = useState()
   const [arrowRotate, setArrowRotate] = useState(180)
   const [arrowTranslate, setArrowTranslate] = useState(6)
   const [optionMenu, setOptionMenu] = useState(false)

   useEffect(() => {
      let selectedImg;
      switch (selectValue) {
         case 'GitHub':
            selectedImg = IconGithub
            break
         case 'Facebook':
            selectedImg = IconFacebook
            break
         case 'Youtube':
            selectedImg = IconYoutube
            break
         default:
            selectedImg = ''
            break
      }

      setSelectImg(selectedImg)
   }, [])
   const handleSelect = (e) => {

      let selectedImg;
      switch (e.currentTarget.children[1].innerHTML) {
         case 'GitHub':
            selectedImg = IconGithub
            break
         case 'Facebook':
            selectedImg = IconFacebook
            break
         case 'Youtube':
            selectedImg = IconYoutube
            break
         default:
            selectedImg = ''
            break
      }

      setSelectImg(selectedImg)
      setSelectValue(e.currentTarget.children[1].innerHTML)
      setArrowRotate(v => v === 0 ? 180 : 0)
      setArrowTranslate(v => v === 0 ? 6 : 0)
      setOptionMenu(false)
   }
   const handleArrow = () => {
      setArrowRotate(v => v === 0 ? 180 : 0)
      setArrowTranslate(v => v === 0 ? 6 : 0)
      setOptionMenu(v => v === false ? true : false)
   }


   return (
      <div id={id} className={'link'}>
         <div className="link-header">
            <div className={'drag-drop'}>
               <img src={iconDrag} width={12} height={12} alt="a" />
               <p>Link #{id}</p>

            </div>
            <button onClick={removeLink}>Remove</button>
         </div>

         <div className="link-input">
            <label htmlFor="link-select">Platform</label>
            {selectImg && selectImg.length > 0 && <img className={'link-selected'} src={selectImg} alt="a" />}
            <input name="link-select" id="link-select" value={selectValue} disabled={true} />

            <svg className={'arrow-select'} onClick={handleArrow} style={{transform: `rotate(${arrowRotate}deg) translateY(${arrowTranslate}px)`}}>
               <line x1="2" y1="9" x2="9" y2="2" stroke="#0000FF" strokeWidth="2" strokeLinecap="square" />
               <line x1="9" y1="2" x2="16" y2="9" stroke="#0000FF" strokeWidth="2" strokeLinecap="square" />
            </svg>

            {optionMenu &&
               <div className={'list-options'}>
                  <div className={'option-row'} onClick={handleSelect}>
                     <IconGithubMultiColor className={'svg-multi'} />
                     <p>GitHub</p>
                  </div>
                  <hr/>
                  <div className="option-row" onClick={handleSelect}>
                     <IconFacebookMultiColor className={'svg-multi'} />
                     <p>Facebook</p>
                  </div>
                  <hr/>
                  <div className="option-row" onClick={handleSelect}>
                     <IconYoutubeMultiColor className={'svg-multi'} />
                     <p>Youtube</p>
                  </div>
               </div>
            }
         </div>

         <div className="link-input">
            <label htmlFor={'link-input'}>Link</label>
            <img className={'img-1'} src={iconLink} alt="a" />
            <input id={'link-input'} className={'data-link'} type="text" placeholder={'e.g. https://github.com/profil'}/>
         </div>
      </div>
   )
}

export default AddLink;