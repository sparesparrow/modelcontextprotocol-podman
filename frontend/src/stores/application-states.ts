/**********************************************************************
 * Copyright (C) 2024 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import type { Readable } from 'svelte/store';
import { readable } from 'svelte/store';
import { Messages } from '@shared/Messages';
import { rpcBrowser, studioClient } from '/@/utils/client';
import type { ApplicationState } from '@shared/src/models/IApplicationState';

export const applicationStates: Readable<ApplicationState[]> = readable<ApplicationState[]>([], set => {
  // Subscribe to state updates from backend
  const sub = rpcBrowser.subscribe(Messages.MSG_NEW_PULLED_APPLICATION_STATE, msg => {
    set(msg);
  });

  // Request initial state
  studioClient
    .getApplicationsState()
    .then(state => {
      set(state);
    })
    .catch((err: unknown) => {
      console.error('Error getting applications state:', err);
      // Initialize with empty state on error
      set([]);
    });

  // Cleanup subscription on store destruction
  return () => {
    sub.unsubscribe();
  };
});
