<?php

if(!function_exists('wphobby_checkInnerBlocks')){
    function wphobby_checkInnerBlocks( $block ) {
        static $currentBlocks = [];
        
        $current = $block;
    
        if( $block['blockName'] == 'core/block' ) { //reusable block
            $current = parse_blocks( get_post_field( 'post_content', $block['attrs']['ref'] ) )[0];
        }
    
        if( $current['blockName'] != '' ) {
            array_push( $currentBlocks, $current );
            if( count( $current['innerBlocks'] ) > 0 ){
                foreach( $current['innerBlocks'] as $innerBlock ) {
                    wphobby_checkInnerBlocks( $innerBlock );
                }
            }
        }
        return $currentBlocks;
    }
}

if(!function_exists('wphobby_getPresentBlocks')){
    function wphobby_getPresentBlocks(){
        $presentBlocks = [];

        $posts_array = get_post();
        if($posts_array){
            foreach(parse_blocks( $posts_array->post_content ) as $block){
                $presentBlocks = wphobby_checkInnerBlocks($block);
            }
        }

        return $presentBlocks;
    }
}