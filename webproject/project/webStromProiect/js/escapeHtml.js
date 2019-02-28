/**
 * Created by liaoyao on 2017/2/21.
 */
function escapeHtml(data){
    if(data==='<'){
        return '&#60';
    }
    if(data==='>'){
        return '&#62';
    }
    if(data==='&'){
        return '&#38';
    }
    if(data==='“'){
        return '&#8220';
    }
}
document.write(escapeHtml('<'));