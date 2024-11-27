'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Rankings } from './rankings';
import { Summary } from './summary';
import { Repositories } from './repositories';
import { Issues } from './issues';

interface UserContentProps {
  username: string;
}

export function UserContent({ username }: UserContentProps) {
  return (
    <Tabs defaultValue="rankings" className="w-full">
      <TabsList>
        <TabsTrigger value="rankings">Rankings</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="repositories">Repositories</TabsTrigger>
        <TabsTrigger value="issues">Issues</TabsTrigger>
        <TabsTrigger value="score">Score</TabsTrigger>
      </TabsList>

      <TabsContent value="rankings">
        <Rankings username={username} />
      </TabsContent>

      <TabsContent value="summary">
        <Summary username={username} />
      </TabsContent>

      <TabsContent value="repositories">
        <Repositories username={username} />
      </TabsContent>

      <TabsContent value="issues">
        <Issues username={username} />
      </TabsContent>
    </Tabs>
  );
}
