/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$('img[src*="svg"]').attr('src', function() {
    return $(this).attr('src').replace('.svg','.png');
});