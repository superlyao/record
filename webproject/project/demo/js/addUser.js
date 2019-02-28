/**
 * Created by liaoyao on 2017/3/7.
 */

    $('.create-passenger').on('click',function () {
       let temp=$('.user:first-child').clone();
       $('.form-group').append(temp);
    });
