/*
 * Copyright 2020. Huawei Technologies Co., Ltd. All rights reserved.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
package com.live.common.util;


/**
 * A tool for validating the parameters
 *
 * @Author live
 * @Date 2022-04-22 16:55
 */
public class ValidatorUtil {

    public static void checkArgument(boolean expression) throws Exception {
        if (!expression) {
            throw new Exception();
        }
    }

    public static void checkArgument(boolean expression, Object errorMessage) throws Exception {
        if (!expression) {
            throw new Exception(String.valueOf(errorMessage));
        }
    }

    public static void checkState(boolean expression, Object errorMessage) {
        if (!expression) {
            throw new IllegalStateException(String.valueOf(errorMessage));
        }
    }
}
