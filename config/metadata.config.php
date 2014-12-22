<?php
/**
 * C5block - A Theme for Novius OS which allows to create concrete5 block template files.
 *
 * @copyright  2014 Fumito MIZUNO
 * @license    GNU Affero General Public License v3 or (at your option) any later version
 *             http://www.gnu.org/licenses/agpl-3.0.html
 * @link http://www.rescuework.jp
 */

return array(
    'name'    => 'c5block',
    'version' => '5.0 (Elche)',
    'provider' => array(
        'name' => 'Fumito MIZUNO',
    ),
    'namespace' => 'Nos\C5block',
    'launchers' => array(
    ),
    'enhancers' => array(
    ),
    'templates' => array(
        'c5block' => array(
            'file' => 'c5block::c5block',
            'title' => 'c5block',
            'cols' => 1,
            'rows' => 2,
            'layout' => array(
                'content' => '0,0,1,1',
                'content2' => '0,1,1,1',
            ),
            'module' => '',
        ),
    ),
);
